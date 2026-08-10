package com.SoulSpace.backend.Services;

import com.SoulSpace.backend.Models.BookReservation;
import com.SoulSpace.backend.Models.LoungeEventRegistration;
import com.SoulSpace.backend.Models.SeatBooking;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DashboardServices {

    private final BookReservationServices bookReservationServices;
    private final SeatBookingServices seatBookingServices;
    private final EventRegistrationServices eventRegistrationServices;

    public DashboardServices(
            BookReservationServices bookReservationServices,
            SeatBookingServices seatBookingServices,
            EventRegistrationServices eventRegistrationServices
    ) {
        this.bookReservationServices = bookReservationServices;
        this.seatBookingServices = seatBookingServices;
        this.eventRegistrationServices = eventRegistrationServices;
    }

    // ================= BOOKS =================

    public List<BookReservation> getCurrentBooks(UUID userId) {
    return bookReservationServices.getCurrentReservation(userId);
}

    public List<BookReservation> getBookHistory(UUID userId) {
        return bookReservationServices.getReservationHistory(userId);
    }

    // ================= SEATS =================

    public SeatBooking getCurrentSeat(UUID userId) {
        return seatBookingServices.getCurrentBooking(userId);
    }

    public List<SeatBooking> getSeatHistory(UUID userId) {
        return seatBookingServices.getBookingHistory(userId);
    }

    // ================= EVENTS =================

    public List<LoungeEventRegistration> getCurrentEvents(UUID userId) {
        return eventRegistrationServices.getCurrentRegistrations(userId);
    }

    public List<LoungeEventRegistration> getEventHistory(UUID userId) {
        return eventRegistrationServices.getRegistrationHistory(userId);
    }

}