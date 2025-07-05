import { Box, Button, Card, CardContent, CardHeader, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useState } from 'react';
import './App.scss';

interface Trip {
	distance: number;
	pricePerLiter: number;
	usage: number;
	roundTrip: boolean;
}

type TripKeys = keyof Trip;

function App() {
	const [trip, setTrip] = useState<Trip>({ distance: 0, pricePerLiter: 200, usage: 5.5, roundTrip: false });
	const [tripPrice, setTripPrice] = useState<number>(0);

	const calculate = () => {
		const { distance, usage, pricePerLiter, roundTrip } = trip;
		const newTripPrice = (distance / 100) * usage * pricePerLiter * (roundTrip ? 2 : 1);
		setTripPrice(newTripPrice);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, tripKey: TripKeys) => {
		setTrip((currentTrip) => {
			return { ...currentTrip, [tripKey]: event.target.value };
		});
	};

	const handleRoundTripCheck = (_event: React.MouseEvent<HTMLElement>, value: boolean) => {
		setTrip((currentTrip) => {
			return { ...currentTrip, roundTrip: value };
		});
	};

	return (
		<>
			<Box display='flex' flexDirection='column' gap={2} width={{ sm: '85%', md: 420 }} ml='auto' mr='auto' mt={12}>
				<Typography variant='h3' textAlign='center'>
					Travel Split
				</Typography>
				<TextField
					label='Distance (km)'
					value={trip.distance}
					type='number'
					onChange={(e) => {
						handleChange(e, 'distance');
					}}
				/>
				<TextField
					label='Usage (liters per 100 km)'
					value={trip.usage}
					type='number'
					onChange={(e) => {
						handleChange(e, 'usage');
					}}
				/>
				<TextField
					label='Price (per 100 km)'
					value={trip.pricePerLiter}
					type='number'
					onChange={(e) => {
						handleChange(e, 'pricePerLiter');
					}}
				/>

				<Box>
					<Typography>Round trip</Typography>
					<ToggleButtonGroup onChange={handleRoundTripCheck} exclusive value={trip.roundTrip}>
						<ToggleButton value={true}>
							<Typography>Yes</Typography>
						</ToggleButton>
						<ToggleButton value={false}>
							<Typography>No</Typography>
						</ToggleButton>
					</ToggleButtonGroup>
				</Box>

				<Button variant='outlined' onClick={calculate}>
					Calculate
				</Button>

				<Card>
					<CardHeader title='Result' />
					<CardContent>{tripPrice !== 0 && <Typography>{tripPrice}</Typography>}</CardContent>
				</Card>
			</Box>
		</>
	);
}

export default App;
