import userservice from '../services/userservice'
import React from 'react'
import ls from 'local-storage'
import TypoComponent from './TypoComponent'
import { Bar } from 'react-chartjs-2'

export default function IdeasByTheme() {
	const [newdata, setNewData] = React.useState({})
	React.useEffect(() => {
		const token = ls.get('token')
		async function fetchData() {
			if (token) {
				userservice.setToken(token)
				const alldata = await userservice.getIdeasbyTheme()
				setNewData(alldata.result)
			} else {
				return
			}
		}
		fetchData()
	}, [])

	const xlabels = Object.keys(newdata)
	const ylabels = Object.values(newdata)

	const data = {
		labels: xlabels,
		datasets: [
			{
				label: 'No of ideas',
				data: ylabels,
				fill: false,
				backgroundColor: [
					'rgba(170,50,109,0.8)',
					'rgba(144,55,156,0.8)',
					'rgba(170,47,84,0.8)',
					'rgba(60,50,156,0.8)',
					'rgba(23,90,157,0.8)',
					'rgba(24,30,143,0.8)',
				],
				borderColor: [
					'rgba(170,50,109,1)',
					'rgba(144,55,156,1)',
					'rgba(170,47,84,1)',
					'rgba(60,50,156,1)',
					'rgba(23,90,157,1)',
					'rgba(24,30,143,1)',
				],
				borderWidth: 1,
			},
		],
	}

	const options = {
		scale: {
			ticks: {
				precision: 0,
				beginAtZero: true,
			},
		},
	}

	return (
		<>
			<div>
				<TypoComponent variant='h5' position='center'>
					No. of Ideas by Theme
				</TypoComponent>
			</div>
			<div>
				<Bar data={data} options={options} />
			</div>
		</>
	)
}
