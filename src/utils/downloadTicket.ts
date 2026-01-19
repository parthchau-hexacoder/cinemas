import { jsPDF } from "jspdf";
import type { Order } from "../types";

export const downloadTicket = (booking: Order) => {
  const doc = new jsPDF();

  const startY = 20;
  let y = startY;

  const date = new Date(booking.showtime.startTime).toLocaleDateString("en-IN");
  const time = new Date(booking.showtime.startTime).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const seats = booking.seatData.seats
    .map((s) => `${s.row}${s.column}`)
    .join(", ");


    doc.setFontSize(18);
  doc.setTextColor(2, 132, 199); 
  doc.text("Movie Ticket", 105, y, { align: "center" });

  y += 12;
  doc.setDrawColor(2, 132, 199);
  doc.line(20, y, 190, y);
  y += 10;


  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text(booking.showtime.movie.name, 20, y);
  y += 10;


  doc.setFontSize(11);
  doc.text("Theater:", 20, y);
  doc.text(booking.showtime.screen.theaterName, 50, y);
  y += 8;


  doc.text("Date:", 20, y);
  doc.text(`${date}`, 50, y);
  y += 8;

  doc.text("Time:", 20, y);
  doc.text(`${time}`, 50, y);
  y += 8;


  doc.text("Seats:", 20, y);
  doc.text(seats || "-", 50, y);
  y += 10;


  doc.text("Total Paid:", 20, y);
  doc.text(`${booking.totalPrice} Rupees`, 50, y);
  y += 10;


  doc.setFontSize(10);
  doc.text("Booking ID:", 20, y);
  doc.text(booking.id, 50, y);
  y += 10;


  doc.setDrawColor(200);
  doc.line(20, 270, 190, 270);

  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text(
    "Please carry this ticket (digital or printed) to the theater.",
    105,
    280,
    { align: "center" }
  );


  doc.save(`Ticket-${booking.id}.pdf`);
};
