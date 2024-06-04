const express = require('express');
const mongoose = require('mongoose');
const Order = require('../Models/Order.Model');
const app = express();
app.use(express.json());

// Define your controller functions
// const getOrderForms = (req, res) => {
//     OrderForm.find({})
//         .then(forms => {
//             res.status(200).json(forms);
//         })
//         .catch(err => {
//             res.status(500).json({ message: 'Something went wrong' });
//         });
// };

const createOrderForm = async (req, res) => {
    try {
        const form = new Order({
            fullName: req.body.fullName,
            address: req.body.address,
            city: req.body.city,
            postalCode: req.body.postalCode
        });

        await form.save();
        return res.status(201).json({ message: 'Form created successfully' });
    } catch (error) {
        console.error('Error creating form:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

// const updateOrderForm = async (req, res) => {
//     const id = req.params.id;
//     const { fullName, address, city, postalCode } = req.body;

//     try {
//         const updatedData = { fullName, address, city, postalCode };

//         const updatedForm = await OrderForm.findByIdAndUpdate(id, updatedData, { new: true });

//         if (!updatedForm) {
//             return res.status(404).json({ message: 'Form not found' });
//         }

//         return res.status(200).json(updatedForm);
//     } catch (error) {
//         console.error('Error updating form:', error);
//         return res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// const deleteOrderForm = (req, res) => {
//     const id = req.params.id;
//     OrderForm.findByIdAndRemove(id, (err, form) => {
//         if (err) {
//             res.status(500).json({ message: 'Something went wrong' });
//         } else if (!form) {
//             res.status(404).json({ message: 'Form not found' });
//         } else {
//             res.status(200).json(form);
//         }
//     });
// };


module.exports = {
    // getOrderForms,
    createOrderForm,
    // updateOrderForm,
    // deleteOrderForm,
};
