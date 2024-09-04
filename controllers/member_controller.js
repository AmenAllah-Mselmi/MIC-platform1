
import { Member } from '../models/user';
export const controller={
    afficher_All: async (req, res) => {
        try {
            const Members = await Member.find();
            res.status(200).json(Members);
        } catch (error) {
            res.status(404).json({ message: "Error in generating Members" });
        }
    },
    create_Member: async (req, res) => {
        try {
            const create = await Member.create(req.body);
            res.status(201).json({ message: "Member created successfully", Member: create });
        } catch (error) {
            res.status(404).json({ message: "Error in creating Members" });
        }
    },
    update_Member: async (req, res) => {
        try {
            const id = req.params.id;
            const update = await Member.updateOne({ _id: id }, req.body);
            if (update.nModified === 0) {
                return res.status(404).json({ message: "Member not found or no changes made" });
            }
            res.status(200).json({ message: "Member updated successfully" });
        } catch (error) {
            res.status(404).json({ message: "Error in updating Member" });
        }
    },
    delete_Member: async (req, res) => {
        try {
            const id = req.params.id;
            const deleted = await Member.deleteOne({ _id: id });
            if (deleted.deletedCount === 0) {
                return res.status(404).json({ message: "Member not found" });
            }
            res.status(200).json({ message: "Member deleted successfully" });
        } catch (error) {
            res.status(404).json({ message: "Error in deleting Admin" });
        }
    },
    findMember: async (req, res) => {
        try {
            const id = req.params.id;
            const member = await Member.findById(id); 
    
            if (!member) {
                return res.status(404).json({ message: "This Member doesn't exist" });
            }
    
            return res.status(200).json(member);
            
        } catch (error) {
            console.error('Error in finding Member:', error); 
            return res.status(400).json({ message: 'Error in finding Member' });
        }
    }
    ,
    count: async (req, res) => {
        try {
            const Members = await Member.countDocuments()
            res.status(200).json(Members);
        } catch (error) {
            res.status(404).json({ message: "Error in counting Members" });
        }
    }
}
export default controller;