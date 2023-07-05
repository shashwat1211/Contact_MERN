const Contact = require("../models/Contact");
const mongoose = require("mongoose")

//9955761346

// GET ALL CONTACTS
const getContacts = async(req,res)=>{
    const user_id = req.user._id
    const contacts = await Contact.find({user_id}).sort({createdAt:-1})
    res.status(200).json(contacts);
}
//Get contact by id
const getcontact = async(req,res)=>{
    const {id} = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error:"CONTACT not found"})
    }
    const contact = await Contact.findById(id);
    if(!contact)return res.status(404).json({error:"NO such Contact"})
    res.status(200).json(contact);
}
//create a new contact
const createContact = async (req, res) => {
    const { name, info, email ,address } = req.body;
    
    let empty = []
    if(!name)empty.push("name")
    if(!info)empty.push("info")
    if(!email)empty.push("email")

    if(empty.length>0){
        return res.status(400).json({error:"Please fill in the fields" , empty})
    }
    try {
        const user_id = req.user._id;
        const contact = await Contact.create({ name, info, email ,address,user_id })
        res.status(200).json(contact);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}
const deleteContact = async(req,res)=>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "CONTACT not found" })
    }
    const contact = await Contact.findOneAndDelete({_id:id})
    if (!contact) return res.status(404).json({ error: "NO such Contact" })
    res.status(200).json(contact)
}


const updateContact = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "CONTACT not found" })
    }
    const contact = await Contact.findOneAndUpdate({_id:id},{
        ...req.body
    }) 
    if (!contact) return res.status(404).json({ error: "NO such Contact" })
    res.status(200).json(temp)
}
module.exports = {getContacts,getcontact,createContact , deleteContact ,updateContact}