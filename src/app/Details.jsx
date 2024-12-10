import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../context/auth';
import { MdLockOutline } from 'react-icons/md';
import useApiFetch from '../hooks/useApiFetch';
import Spinner from '../components/Spinner';
import Reservation from '../components/datails/Reservation';
import Description from '../components/datails/Description';
import Galery from '../components/datails/Galery';
import Map from '../components/datails/Map';
import Hero from '../components/datails/Hero';
import Reviews from '../components/datails/Reviews';
import Related from '../components/datails/Related';

function Details() {
	const params = useParams();
	const { isAuth } = useAuth();
	const [hotel, getHotel, loading] = useApiFetch();

	useEffect(() => {
		getHotel({
			url: `/hotels/${params.id}`,
		});
	}, [params.id]);

	if (loading)
		return (
			<div className="grid place-content-center min-h-[100dvh]">
				<Spinner className="w-14 h-14 text-gray-200 fill-blue-500 animate-spin" />
				;
			</div>
		);

	return (
		<div>
			{/*Hero */}

			<Hero hotel={hotel} />

			<div className="max-w-5xl mx-auto p-5 py-10">
				<h2 className="text-2xl font-semibold text-center mb-4">Reserve</h2>

				{/*reservations */}

				<div className="mb-8">
					{isAuth ? (
						<Reservation hotelId={hotel?.id} />
					) : (
						<p className="flex items-center justify-center gap-1">
							<MdLockOutline className="size-5" />
							<span className="text-sm">
								Please, login to make a reservation
							</span>
						</p>
					)}
				</div>

				<div className="grid grid-cols-2 gap-5 mb-8">
					<div className="col-span-2">
						<Description
							description={hotel?.description}
							rating={hotel?.rating}
							address={hotel?.address}
						/>
					</div>
					<div>
						<Galery hotel={hotel} />
					</div>
					<div>
						<Map lat={hotel?.lat} lon={hotel?.lon} />
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<Reviews hotelId={hotel?.id} />
					</div>

					<div className="h-full">
						<div className="sticky top-20">
							<Related cityId={hotel?.cityId} hotelId={hotel?.id} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export { Details };
