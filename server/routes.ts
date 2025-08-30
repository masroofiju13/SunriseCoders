import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertBookingSchema, insertCalculatorSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json({ success: true, data: contact });
    } catch (error) {
      res.status(400).json({ success: false, error: "Invalid contact data" });
    }
  });

  // Get all contacts (admin endpoint)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json({ success: true, data: contacts });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch contacts" });
    }
  });

  // Booking submission
  app.post("/api/booking", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.json({ success: true, data: booking });
    } catch (error) {
      res.status(400).json({ success: false, error: "Invalid booking data" });
    }
  });

  // Get all bookings (admin endpoint)
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json({ success: true, data: bookings });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch bookings" });
    }
  });

  // Calculator submission
  app.post("/api/calculator", async (req, res) => {
    try {
      const validatedData = insertCalculatorSchema.parse(req.body);
      const calculator = await storage.createCalculatorSubmission(validatedData);
      res.json({ success: true, data: calculator });
    } catch (error) {
      res.status(400).json({ success: false, error: "Invalid calculator data" });
    }
  });

  // Get calculator submissions (admin endpoint)
  app.get("/api/calculator", async (req, res) => {
    try {
      const calculators = await storage.getCalculatorSubmissions();
      res.json({ success: true, data: calculators });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch calculator submissions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
