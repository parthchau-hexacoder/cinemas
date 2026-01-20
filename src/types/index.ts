export interface Movie {
    id: string;
    name: string;
    description: string;
    duration: number;
    image: string;
    category: string[];
    languages: string[];
    createdAt: string;
    updatedAt: string;
    theaters?: Theater[];
}

export interface Theater {
    id: string;
    name: string;
    location: string;
    showtime?: Show[];
}

export interface User {
    email: string;
    name?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
}

export type ShowStatus = "scheduled" | "cancelled" | "completed";

export interface ShowPrice {
    type: string;
    price: number;
    layoutType?: string;
}


export interface Seat {
    row: string;
    column: number;
    layoutType: string;
    status?: 'available' | 'booked' | 'blocked';
}

export interface SeatData {
    seats: Seat[];
}

export interface Order {
    id: string;
    userId: string;
    showtimeId: string;
    amount: number;
    seatData: SeatData;
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    createdAt: string;
    updatedAt: string;
}

export interface Screen {
    id: string;
    screenNumber: number;
    layout: any;
    theaterId: string;
    theaterName: string;
}

export interface Show {
    id: string;
    movieId: string;
    screenId: string;
    startTime: string;
    status: ShowStatus;
    price: ShowPrice[];
    orders?: Order[];
    screen?: Screen;
    createdAt: string;
    updatedAt: string;
}

export interface BookingPayload {
    showtimeId: string;
    seatData: {
        seats: {
            row: string;
            column: number;
            layoutType: string;
        }[];
    };
}

export interface PaymentPayload {
    payload: BookingPayload;
    amount: number;
    show: Show;
    theater: Theater;
    date: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}



export interface Order {
  id: string;
  transactionId: string;
  userId: string;
  showtimeId: string;

  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  totalPrice: number;

  seatData: SeatData;

  createdAt: string;
  updatedAt: string;

  showtime: {
    id: string;
    startTime: string;

    movie: {
      id: string;
      name: string;
    };

    screen: {
      id: string;
      theaterName: string;
    };
  };
}