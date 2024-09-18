import Response from '../models/response.js';

const Response_controller = {
    Display_All: async (req, res) => {
        try {
        const Responses = await Response.find();
        res.status(200).json(Responses);
        } catch (error) {
        res.status(500).json({ message: "Server error in generating Responses" });
        }
    },

    create_Response: async (req, res) => {
        try {
        const create = await Response.create(req.body);
        res.status(201).json({ message: "Response created successfully", Response: create });
        } catch (error) {
        res.status(500).json({ message: "Server error in creating Response" });
        }
    },

    update_Response: async (req, res) => {
        try {
        const id = req.params.id;
        const update = await Response.updateOne({ _id: id }, req.body);
        if (update.modifiedCount === 0) {
            return res.status(404).json({ message: "Response not found or no changes made" });
        }
        res.status(200).json({ message: "Response updated successfully" });
        } catch (error) {
        res.status(500).json({ message: "Server error in updating Response" });
        }
    },

    delete_Response: async (req, res) => {
        try {
        const id = req.params.id;
        const deleted = await Response.deleteOne({ _id: id });
        if (deleted.deletedCount === 0) {
            return res.status(404).json({ message: "Response not found" });
        }
        res.status(200).json({ message: "Response deleted successfully" });
        } catch (error) {
        res.status(500).json({ message: "Server error in deleting Response" });
        }
    },

    findResponsebyId: async (req, res) => {
        try {
        const id = req.params.id;
        const Response_Result = await Response.findById(id);

        if (!Response_Result) {
            return res.status(404).json({ message: "This Response doesn't exist" });
        }

        return res.status(200).json(Response_Result);
        } catch (error) {
        res.status(500).json({ message: "Server error in finding Response" });
        }
    },
    findResponsebyUserId: async (req, res) => {
        try {
        const id = req.params.id;
        const Response_Result = await Response.find({User_id:id});

        if (!Response_Result) {
            return res.status(404).json({ message: "This Response doesn't exist" });
        }

        return res.status(200).json(Response_Result);
        } catch (error) {
        res.status(500).json({ message: "Server error in finding Response" });
        }
    },

    count: async (req, res) => {
        try {
        const Responses = await Response.countDocuments();
        res.status(200).json(Responses);
        } catch (error) {
        res.status(500).json({ message: "Server error in counting Responses" });
        }
    },
};

export default Response_controller;
