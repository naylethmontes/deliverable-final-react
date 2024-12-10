import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useApiFetch from '../../hooks/useApiFetch';
import { cn } from '../../utils';

const schema = z.object({
	checkIn: z.string().min(1, { message: 'Check-In is required' }),
	checkOut: z.string().min(1, { message: 'Check-Out is required' }),
});

function Reservation({ hotelId }) {
	const [data, createReservation] = useApiFetch();
	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(schema),
	});

	const onSubmit = (dataForm) => {
		dataForm.hotelId = hotelId;
		createReservation({
			url: '/bookings',
			method: 'POST',
			body: dataForm,
		});
		toast('successful reservation✅');
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col md:flex-row md:items-center justify-center gap-2 mb-4">
				<div className="flex items-center justify-center gap-2 mb-4">
					<div className="flex flex-col items-center">
						<label className="font-semibold text-sm">Check-In</label>
						<input
							type="date"
							className="border px-3 py-1 rounded-sm"
							{...register('checkIn')}
						/>
					</div>
					<div className="flex flex-col items-center">
						<label className="font-semibold text-sm">Check-Out</label>
						<input
							type="date"
							className="border px-3 py-1 rounded-sm"
							{...register('checkOut')}
						/>
					</div>
				</div>

				<button className="btn bg-emerald-500">Reserve</button>
			</div>

			<p
				className={cn(
					'bg-red-500 bg-opacity-15 text-red-500 py-1 px-3 rounded-sm hidden',
					(errors.checkIn || errors.checkOut) && 'block',
				)}
			>
				{errors.checkIn && errors.checkIn.message}{' '}
				{errors.checkOut && errors.checkOut.message}
			</p>
		</form>
	);
}
export default Reservation;
