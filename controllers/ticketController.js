import asyncHandler from 'express-async-handler';
import Ticket from '../models/ticketModel.js'
import User from '../models/userModel.js'
export const createTicket = asyncHandler(async (req, res) => {
    try {
        const { email, category, subcategory, description } = req.body;
        if (!email) {
            res.send({ error: 'Enter Email' });
            return;
        }
        if (!category) {
            res.send({ error: 'Enter Category' });
            return;
        }
        if (!subcategory) {
            res.send({ error: 'Enter Subcategory' });
            return;
        }
        if (!description) {
            res.send({ error: 'Enter Description' });
            return;
        }
        const ticket = await Ticket.create({ email: email, Category: category, SubCategory: subcategory, Description: description,status:"Open" });
        if (ticket) {
            res.status(200).send({
                success: true,
                message: "Ticket Created successfully",
                Ticket: {
                    category: category,
                    subcategory: subcategory,
                    description: description
                }
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: error
        });
    }

});

export const allTickets = asyncHandler(async (req, res) => {
    try {
        const id = req.params._id;
        // console.log(id)
        const getEmail = await User.findById(id);
        // console.log(getEmail.email);
        const tickets = await Ticket.find({ email: getEmail.email });
        res.status(200).send({
            success: true,
            AllTicket: tickets
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: error
        });
    }
});

export const closeTicket = asyncHandler(async (req, res) => {
    try {
        const id = req.params._id;
        const close = await Ticket.findByIdAndUpdate(id, { status: 'closed' });
        res.status(200).send({
            success: true,
            message: " Ticket Successfully Closed"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: error
        });
    }
});

export const deleteTicket = asyncHandler(async (req, res) => {
    try {
        const id = req.params._id;
        const deleteTicket = await Ticket.deleteOne({_id:id});
        res.status(200).send({
            success: true,
            message: " Ticket Successfully Deleted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: error
        });
    }
});

