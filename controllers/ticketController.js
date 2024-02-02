import asyncHandler from 'express-async-handler';
import Ticket from '../models/ticketModel.js'
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
        const ticket = await Ticket.create({ email: email, Category: category, SubCategory: subcategory, Description: description });
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
