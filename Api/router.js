const router = require("express").Router();
const student = require("../schemas/student");
const dean = require("../schemas/dean");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");
const session = require("../schemas/session");
const { v4: uuidv4 } = require('uuid');


// Student register/login

router.post("/register", async (req, res) => {

    try {
        const studentExit = await student.findOne({ universityId: req.body.universityId })
        if (studentExit) {
            return res.status(400).json("Already register your id ");
        }
        const psHash = await bcrypt.hash(req.body.password, 10);
        const data = new student({
            universityId: req.body.universityId,
            password: psHash,
        });
        const result = await data.save();
        res.json(result);

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }

});

router.post("/login", async (req, res) => {
    try {
        const studentExit = await student.findOne({ universityId: req.body.universityId })
        if (!studentExit) {
            return res.status(400).json("Your UniversityId Wrong");
        }
        const passwordValidation = await bcrypt.compare(req.body.password, studentExit.password);
        if (!passwordValidation) {
            return res.status(400).json("Your Password Wrong");
        }
        const userToken = jwt.sign({ id: studentExit._id }, "userinfoSecretId", { expiresIn: "2d" });
        res.header("auth", userToken).send(userToken);

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });

    }
})

// Fetching Available Sessions

router.get('/sessions/free-dean', verifyToken, async (req, res) => {
    const freeDeanSessions = await session.find({
        day: { $in: ['Thursday', 'Friday'] },
        time: '10:00 AM',
        booked: false,
    });
    res.json({ sessions: freeDeanSessions });
});


// A picks one of the above slots and books

router.post('/sessions/book-dean', verifyToken, async (req, res) => {
    try {
        const sessionSlot = await session.findById(req.body.id);
        if (!sessionSlot || sessionSlot.booked || sessionSlot.studentID) {
            return res.status(400).json({ error: 'Invalid session for booking' });
        }

        sessionSlot.booked = true;
        sessionSlot.studentID = req.student.universityID;
        await sessionSlot.save();

        res.json({ message: 'Dean session booked successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});


// Dean login/register

router.post("/register/dean", async (req, res) => {

    try {
        const deanExit = await dean.findOne({ deanUniversityId: req.body.deanUniversityId })
        if (deanExit) {
            return res.status(400).json("Already register your id ");
        }
        const psHash = await bcrypt.hash(req.body.password, 10);
        const data = new dean({
            deanUniversityId: req.body.deanUniversityId,
            password: psHash,
        });
        const result = await data.save();
        res.json(result);

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }

});

router.post("/dean/login", async (req, res) => {
    try {
        const deanExit = await dean.findOne({ deanUniversityId: req.body.deanUniversityId })
        if (!deanExit) {
            return res.status(400).json("Your UniversityId Wrong");
        }
        const passwordValidation = await bcrypt.compare(req.body.password, deanExit.password);
        if (!passwordValidation) {
            return res.status(400).json("Your Password Wrong");
        }
        const userToken = jwt.sign({ id: deanExit._id }, "userinfoSecretId", { expiresIn: "2d" });
        res.header("auth", userToken).send(userToken);

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });

    }
});

// Dean sees a list of all pending sessions - student name, and slot details. Currently only A.

router.get('/sessions/pending-dean', verifyToken, async (req, res) => {
    try {
        const pendingSessions = await session.find({ booked: true }).populate('studentID', 'universityID');
        const deanPendingSessions = pendingSessions.filter(ses => ses.day === 'Thursday' || ses.day === 'Friday');
        res.json({ pendingSessions: deanPendingSessions });

    } catch (error) {

        res.status(500).json({ error: 'An error occurred' });
    }
});

// Student B login

router.post('/auth/student-b-login', async (req, res) => {
    const { universityID, password } = req.body;
    const user = await student.findOne({ universityID, password });
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = uuidv4();
    user.token = token;
    await user.save();
    res.json({ token });
});

// B sees free slots
router.get('/sessions/free-student-b', verifyToken, async (req, res) => {
    const freeSlots = await session.find({ booked: false });
    res.json({ slots: freeSlots });
});


// B books a slot

router.post('/sessions/book-student-b', verifyToken, async (req, res) => {

    try {
        const session = await session.findById(req.body.id);
        if (!session || session.booked) {
            return res.status(400).json({ error: 'Invalid slot for booking' });
        }

        session.booked = true;
        session.studentID = req.student.universityID;
        await session.save();

        res.json({ message: 'Slot booked successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});


// Dean sees pending sessions.

router.get('/sessions/pending-dean-all', verifyToken, async (req, res) => {
    try {
        const pendingSessions = await session.find({ booked: true }).populate('studentID', 'universityID');
        res.json({ pendingSessions });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

//Dean logs in back after slot time booked by A and he can see only B in the list

router.get('/sessions/pending-dean-filtered', verifyToken, async (req, res) => {
    try {
        const now = new Date();
        const pendingSessions = await session.find({
            booked: true,
            startTime: { $gt: now },
        }).populate('studentID', 'universityID');
        res.json({ pendingSessions });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});


module.exports = router;