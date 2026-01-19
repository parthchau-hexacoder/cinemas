import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { bookingService } from '../api/services/booking.service';
import type { Show } from '../types';

export interface SectionData {
    name: string;
    price: number;
    rows: string[];
    columns: number[];
}

export function useSeatBooking(showtimeId: string | undefined) {
    const [sections, setSections] = useState<SectionData[] | null>(null);
    const [excludedSeats, setExcludedSeats] = useState<Set<string>>(new Set());
    const [bookedSeats, setBookedSeats] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState<Show | null>(null);

    const fetchShow = useCallback(async () => {
        if (!showtimeId) return;
        setLoading(true);
        try {
            const res: any = await bookingService.getShowById(showtimeId);
            const showData = res.data.data;
            setShow(showData);

            const prices = showData.price;
            const layout = typeof showData.screen.layout === 'string'
                ? JSON.parse(showData.screen.layout)
                : showData.screen.layout;
            const orders = showData.orders || [];

            const bookedSeatsSet = new Set<string>();
            orders.forEach((order: any) => {
                if (order.seatData?.seats) {
                    order.seatData.seats.forEach((seat: any) => {
                        const seatId = `${seat.row}${seat.column}`;
                        bookedSeatsSet.add(seatId);
                    });
                }
            });
            setBookedSeats(bookedSeatsSet);

            const excludedSeatsSet = new Set<string>();
            const sectionData: SectionData[] = layout.map((layoutSection: any) => {
                const layoutType = layoutSection.type;
                const priceInfo = prices.find((p: any) => p.layoutType === layoutType);

                let allRows: string[] = [];
                if (layoutSection.layout?.rows) {
                    allRows = layoutSection.layout.rows;
                } else if (layoutSection.rows) {
                    allRows = layoutSection.rows;
                }

                const excludedRows = layoutSection.excludedRows || [];
                const availableRows = allRows.filter((row: string) => !excludedRows.includes(row));

                let columns: number[] = [];
                if (layoutSection.layout?.columns) {
                    const [start, end] = layoutSection.layout.columns;
                    columns = Array.from({ length: end - start + 1 }, (_, i) => start + i);
                } else if (layoutSection.columns) {
                    const [start, end] = layoutSection.columns;
                    columns = Array.from({ length: end - start + 1 }, (_, i) => start + i);
                }

                const excludedColumns = layoutSection.excludedColumns || [];
                const localExcludedSeats = layoutSection.excludedSeats || [];

                localExcludedSeats.forEach((seatId: string) => {
                    excludedSeatsSet.add(seatId);
                });

                excludedColumns.forEach((col: number) => {
                    availableRows.forEach((row: string) => {
                        excludedSeatsSet.add(`${row}${col}`);
                    });
                });

                return {
                    name: layoutType,
                    price: priceInfo?.price || 0,
                    rows: availableRows,
                    columns: columns.filter((col: number) => !excludedColumns.includes(col)),
                };
            });

            setSections(sectionData);
            setExcludedSeats(excludedSeatsSet);

        } catch (err: any) {
            console.error('=== Error Fetching Show ===', err);
            toast.error("Failed to load seat layout");
        } finally {
            setLoading(false);
        }
    }, [showtimeId]);

    useEffect(() => {
        fetchShow();
    }, [fetchShow]);

    return { sections, excludedSeats, bookedSeats, loading, show, refresh: fetchShow };
}
