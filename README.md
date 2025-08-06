# Formsub
Customer Onboarding Module for AI Realty Space — A React + Node.js app to capture user interest in real estate services, storing submissions in MongoDB.
# AI Realty Space - Customer Onboarding Module

This repository contains the code for the customer onboarding module of [AI Realty Space](https://airealty.space/). It allows users to register their interest in real estate services via a web form built with ReactJS and Node.js, with data stored securely in MongoDB.

## Features

- Responsive ReactJS frontend with validation for all fields.
- Fields include: Full Name, Mobile Number, Email Address, City of Interest, Type of Property, Budget Range, Message.
- Validation includes mandatory fields, Indian 10-digit mobile number format, and standard email format.
- Backend API built with Node.js and Express handles form submission.
- Data stored in MongoDB database.
- Optional email notifications using Nodemailer.
- Easy to deploy for production with environment configuration.

## Technology Stack

- Frontend: ReactJS, Material-UI (MUI), Axios
- Backend: Node.js, Express.js, Nodemailer
- Database: MongoDB (Atlas or local)
- Deployment: Supports deployment on platforms like Render, Railway, Vercel, Netlify, or traditional VPS

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB instance or MongoDB Atlas account
- Gmail account with App Password (for email notifications)
- npm or yarn for dependency management
