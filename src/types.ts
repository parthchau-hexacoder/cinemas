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
  showtime:[]
}

export interface movieDetails {
  movie:Movie,
  theaters: Theater[]
}


export interface User {
  email: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User,token:string) => void;
  logout: () => void;
}

export interface Screen {
  id: string;
  screenNumber: number;
  layout: string;      
  theaterId: string;
  theaterName: string;
}

export type ShowStatus = "scheduled" | "cancelled" | "completed";

export interface ShowPrice {
  type: string;   // "Platinum" | "Gold" | "Silver"
  price: number;
}

export interface Order {
  id: string;
  // extend later (userId, seats, amount, etc.)
}

export interface Show {
  id: string;
  movieId: string;
  screenId: string;

  startTime: string;    
  status: ShowStatus;

  price: ShowPrice[];
  orders: Order[];

  createdAt: string;     
  updatedAt: string;     
}

export type LayoutType = 'Platinum' | 'Slider Sofa' | 'Lounger';

export interface Seat {
  row: string;
  column: number;
  layoutType: LayoutType;
}

export interface SeatData {
  seats: Seat[];
}


export type BookingStatus = 'PENDING' | 'COMPLETED';

export interface BookingShowtime {
  id: string;
  startTime: string;
  movie: Pick<Movie, 'id' | 'name'>;
  screen: Pick<Screen, 'id' | 'theaterName'>;
}


export interface Booking {
  id: string;
  transactionId: string;
  userId: string;
  showtimeId: string;
  status: BookingStatus;
  totalPrice: number;

  seatData: SeatData;

  createdAt: string;
  updatedAt: string;

  showtime: BookingShowtime;
}
