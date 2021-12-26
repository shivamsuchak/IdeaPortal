import userservice from '../services/userservice'
import React from 'react'
import ls from 'local-storage'
import TypoComponent from './TypoComponent'
import { Bar } from 'react-chartjs-2'

export default function ParticipantsByIdea() {
	const [newdata, setNewData] = React.useState({})
	React.useEffect(() => {
		const token = ls.get('token')
		async function fetchData() {
			if (token) {
				userservice.setToken(token)
				const alldata = await userservice.getTopDislikedIdeas()
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
				label: 'No of dislikes',
				data: ylabels,
				fill: false,
				backgroundColor: [
					'rgba(255,0,0,0.6)',
					'rgba(246,0,71,0.6)',
					'rgba(218,0,113,0.6)',
					'rgba(174,31,141,0.6)',
					'rgba(121,60,151,0.6)',
					'rgba(66,69,143,0.6)',
				],
				borderColor: [
					'rgba(255,0,0,1)',
					'rgba(246,0,71,1)',
					'rgba(218,0,113,1)',
					'rgba(174,31,141,1)',
					'rgba(121,60,151,1)',
					'rgba(66,69,143,1)',
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
					Top 5 Disliked Ideas
				</TypoComponent>
			</div>
			<div>
				<Bar data={data} options={options} />
			</div>
		</>
	)
}
