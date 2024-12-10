import { Routes, Route } from 'react-router';
import { Details, Home, Login, Register, Reservations } from '../app';
import MainLayout from '../layout/MainLayout';
import AuthLayout from '../layout/AuthLayout';
import Protected from './Protected';
import Public from './Public';

function AppRouter() {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route index element={<Home />} />
				<Route path="/hotel/:id" element={<Details />} />
				<Route
					path="/reservations"
					element={
						<Protected>
							<Reservations />
						</Protected>
					}
				/>
			</Route>

			<Route
				element={
					<Public>
						<AuthLayout />
					</Public>
				}
			>
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
			</Route>
		</Routes>
	);
}

export default AppRouter;
