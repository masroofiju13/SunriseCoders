import express from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS for Vercel
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Validation schemas
const insertContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(1),
});

const insertBookingSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  date: z.string().min(1),
  time: z.string().min(1),
});

const insertCalculatorSchema = z.object({
  laborCost: z.number(),
  operationalCost: z.number(),
  workingDays: z.number(),
  monthlySavings: z.number(),
  annualSavings: z.number(),
});

// In-memory storage
class MemStorage {
  constructor() {
    this.contacts = new Map();
    this.bookings = new Map();
    this.calculators = new Map();
  }

  async createContact(insertContact) {
    const id = randomUUID();
    const contact = { 
      ...insertContact, 
      id, 
      company: insertContact.company || null,
      phone: insertContact.phone || null,
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts() {
    return Array.from(this.contacts.values());
  }

  async createBooking(insertBooking) {
    const id = randomUUID();
    const booking = { 
      ...insertBooking, 
      id, 
      phone: insertBooking.phone || null,
      createdAt: new Date() 
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBookings() {
    return Array.from(this.bookings.values());
  }

  async createCalculatorSubmission(insertCalculator) {
    const id = randomUUID();
    const calculator = { 
      ...insertCalculator, 
      id, 
      createdAt: new Date() 
    };
    this.calculators.set(id, calculator);
    return calculator;
  }

  async getCalculatorSubmissions() {
    return Array.from(this.calculators.values());
  }
}

// Initialize storage
const storage = new MemStorage();

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const validatedData = insertContactSchema.parse(req.body);
    const contact = await storage.createContact(validatedData);
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(400).json({ success: false, error: "Invalid contact data" });
  }
});

// Get all contacts (admin endpoint)
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await storage.getContacts();
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch contacts" });
  }
});

// Booking submission
app.post('/api/booking', async (req, res) => {
  try {
    const validatedData = insertBookingSchema.parse(req.body);
    const booking = await storage.createBooking(validatedData);
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, error: "Invalid booking data" });
  }
});

// Get all bookings (admin endpoint)
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await storage.getBookings();
    res.json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch bookings" });
  }
});

// Calculator submission
app.post('/api/calculator', async (req, res) => {
  try {
    const validatedData = insertCalculatorSchema.parse(req.body);
    const calculator = await storage.createCalculatorSubmission(validatedData);
    res.json({ success: true, data: calculator });
  } catch (error) {
    res.status(400).json({ success: false, error: "Invalid calculator data" });
  }
});

// Get calculator submissions (admin endpoint)
app.get('/api/calculator', async (req, res) => {
  try {
    const calculators = await storage.getCalculatorSubmissions();
    res.json({ success: true, data: calculators });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch calculator submissions" });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;