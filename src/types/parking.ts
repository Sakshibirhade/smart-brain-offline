export type SlotType = 'two_wheeler' | 'four_wheeler' | 'ev_charging';
export type SlotStatus = 'available' | 'occupied' | 'reserved' | 'maintenance';
export type BookingStatus = 'pending' | 'active' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface Vehicle {
  id: string;
  user_id: string;
  vehicle_number: string;
  vehicle_type?: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface ParkingSlot {
  id: string;
  slot_number: string;
  slot_type: SlotType;
  floor_level: number;
  status: SlotStatus;
  distance_to_entry?: number;
  nearby_landmarks?: string;
  coordinates_x?: number;
  coordinates_y?: number;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  vehicle_id: string;
  slot_id: string;
  booking_status: BookingStatus;
  booking_date: string;
  booking_time: string;
  entry_time?: string;
  exit_time?: string;
  qr_code?: string;
  otp_code?: string;
  otp_verified: boolean;
  created_at: string;
  updated_at: string;
  vehicles?: Vehicle;
  parking_slots?: ParkingSlot;
}

export interface Payment {
  id: string;
  booking_id: string;
  user_id: string;
  amount: number;
  payment_method?: string;
  payment_status: PaymentStatus;
  transaction_id?: string;
  invoice_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ParkingHistory {
  id: string;
  user_id: string;
  booking_id: string;
  slot_id: string;
  parked_at: string;
  retrieved_at?: string;
  slot_coordinates_x?: number;
  slot_coordinates_y?: number;
  floor_level?: number;
  created_at: string;
  parking_slots?: ParkingSlot;
  bookings?: Booking;
}
