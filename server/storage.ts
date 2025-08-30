import { 
  type User, 
  type InsertUser, 
  type Contact, 
  type InsertContact,
  type Booking,
  type InsertBooking,
  type Calculator,
  type InsertCalculator
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
  createCalculatorSubmission(calculator: InsertCalculator): Promise<Calculator>;
  getCalculatorSubmissions(): Promise<Calculator[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private bookings: Map<string, Booking>;
  private calculators: Map<string, Calculator>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.bookings = new Map();
    this.calculators = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      company: insertContact.company || null,
      phone: insertContact.phone || null,
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      phone: insertBooking.phone || null,
      createdAt: new Date() 
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async createCalculatorSubmission(insertCalculator: InsertCalculator): Promise<Calculator> {
    const id = randomUUID();
    const calculator: Calculator = { 
      ...insertCalculator, 
      id, 
      createdAt: new Date() 
    };
    this.calculators.set(id, calculator);
    return calculator;
  }

  async getCalculatorSubmissions(): Promise<Calculator[]> {
    return Array.from(this.calculators.values());
  }
}

export const storage = new MemStorage();
