import express from "express";
const router = express.Router();



/* End of Importing */

/* Routes */
router.get('/', (req, res) => {
  console.log("router get ", process.pid)

  res.send({ from: process.pid });
  for (let i = 0; i < 100000; i++) {
    console.log("from ", process.pid)
  }
})


/* End Routes */

export const userApiRoute = router;
