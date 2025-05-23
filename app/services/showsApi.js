import axiosClient from '@/utils/axiosClient'; // adjust path as needed
import { ChartNoAxesColumnDecreasing } from 'lucide-react';

// const BASE_URL = "http://atms.test/api";

export const getAllShows = async () => {
  try {
    const response = await axiosClient.get('/shows');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch shows');
  }
};

export const getShowById = async (showId) => {
  try {
    const response = await axiosClient.get(`/shows/${showId}`);
    return response;
  } catch (error) {
    throw new Error('Failed to fetch show details');
  }
};
export const purchaseTickets = async (user, show, selectedSeats, originalAmount, finalAmount) => {
    try {
        const seats = [...selectedSeats.ordinary, ...selectedSeats.balcony]; // Combine ordinary and VIP seats
        const response = await axiosClient.post('/purchase/tickets', { // Use the /api/tickets endpoint you defined in Laravel
            show_id: show,
            seats: seats.map(seat => ({ // Map selectedSeatsInfo to the format expected by your Laravel backend
                seat_id: seat.seat_id,
                row: seat.row,
                seatIndex: seat.seatIndex,
                type: seat.type,
                price: seat.price
            })),
            user_id: user.id,
            original_amount: originalAmount,
            final_amount: finalAmount,
        });

        console.log('Purchase response:', response.data);

        // Handle success (e.g., redirect to a confirmation page, show a success message)
        console.log('Tickets purchased successfully:', response.data);
        // Example:  Redirect to a confirmation pGage, passing the purchase ID
        // router.push(`/confirmation?purchaseId=${response.data.purchase_id}`);  //  Use Next.js router
        alert(`Tickets purchased successfully! Purchase ID: ${response.data.purchase_id}`); // Basic alert.  Replace with a better UI.


    } catch (error) {
        // Handle error (e.g., display a user-friendly error message)
        console.error('Error purchasing tickets:', error);
        if (error.response) {
            // The server responded with an error status code
            alert(`Failed to purchase tickets: ${error.response.data.error || 'An error occurred.'}`);
        } else if (error.request) {
            // The request was made but no response was received
            alert('Failed to purchase tickets: No response from the server.');
        } else {
            // Something happened in setting up the request that triggered an Error
            alert('Failed to purchase tickets: An unexpected error occurred.');
        }
    }
}

export const getPastPurchases = async (userId) => {
  try {
    const response = await axiosClient.post('/tickets/history', {
      user_id: userId,
    }); // Corrected endpoint
    return response.data; // Return the data, not the entire response
  } catch (error) {
    // Handle errors appropriately.  Important for a robust application.
    if (error.response) {
      // The server responded with an error status code
      console.error("Error fetching past purchases:", error.response.data);
      throw new Error(error.response.data.message || 'Failed to fetch past purchases.'); // Improved error message
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error fetching past purchases:", error.request);
      throw new Error('No response from server. Please check your network.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error fetching past purchases:", error.message);
      throw new Error('An error occurred while setting up the request.');
    }
  }
};

export const cancelTickets = async(purchaseId) => {
  try {
    const response = await axiosClient.post('/tickets/cancel', {
      purchase_id: purchaseId,
    });
    return response.data;
  } catch (error) {
    // Handle errors appropriately
    if (error.response) {
      console.error("Error canceling tickets:", error.response.data);
      throw new Error(error.response.data.message || 'Failed to cancel tickets.');
    } else if (error.request) {
      console.error("Error canceling tickets:", error.request);
      throw new Error('No response from server. Please check your network.');
    } else {
      console.error("Error canceling tickets:", error.message);
      throw new Error('An error occurred while setting up the request.');
    }
  }
}

export const downloadTicketPDF = async (purchaseId) => {
  try {
    const response = await axiosClient.get(`/tickets/${purchaseId}/download`, {
      responseType: 'blob', // Important:  Tell axios to expect a Blob
    });

    const blob = response.data; //  The PDF data is in response.data now because of responseType: 'blob'
    return blob;

  } catch (error) {
    //  Improved error handling
    if (error.response) {
      console.error('Error downloading PDF:', error.response.data);
      throw new Error(`Failed to download PDF: ${error.response.status} - ${error.response.data.message || 'Unknown server error'}`);
    } else if (error.request) {
      console.error('Error downloading PDF:', error.request);
      throw new Error('Failed to download PDF: No response from server');
    } else {
      console.error('Error downloading PDF:', error.message);
      throw new Error(`Failed to download PDF: ${error.message}`);
    }
  }};
