    package com.SoulSpace.backend.Dtos;

    import com.SoulSpace.backend.Models.BookReservation;
    import com.SoulSpace.backend.Models.LoungeEventRegistration;
    import com.SoulSpace.backend.Models.SeatBooking;
    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import java.util.List;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public class DashboardResponse {

       private List<BookReservation> currentBookReservations;
        private List<BookReservation> bookHistory;

        private SeatBooking currentSeatBooking;
        private List<SeatBooking> seatHistory;

        private List<LoungeEventRegistration> eventRegistrations;
    }