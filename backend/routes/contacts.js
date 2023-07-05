const express = require("express")
const {getContacts,getcontact, createContact,deleteContact, updateContact} = require("../controllers/contactControllers")
const  requireAuth  = require("../middleware/requireAuth")

const router = express.Router()

router.use(requireAuth)


//Get all contacts
router.get("/" , getContacts);

//Get a single contact
router.get("/:id", getcontact)

//Post a contact
router.post("/" ,createContact )

//DELETe a contact
router.delete("/:id", deleteContact)

//update a contact
router.patch("/:id", updateContact)

module.exports = router 