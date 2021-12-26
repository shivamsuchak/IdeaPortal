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
				const alldata = await userservice.getTopLikedIdeas()
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
				label: 'No of likes',
				data: ylabels,
				fill: false,
				backgroundColor: [
					'rgba(116,49,156,0.8)',
					'rgba(46,70,213,0.8)',
					'rgba(3,94,157,0.8)',
					'rgba(66,69,143,0.8)',
					'rgba(116,49,156,0.8)',
					'rgba(25,69,241,0.8)',
				],
				borderColor: [
					'rgba(116,49,156,1)',
					'rgba(46,70,213,1)',
					'rgba(3,94,157,1)',
					'rgba(66,69,143,1)',
					'rgba(116,49,156,1)',
					'rgba(25,69,241,1)',
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
					Top 5 Liked Ideas
				</TypoComponent>
			</div>
			<div>
				<Bar data={data} options={options} />
			</div>
		</>
	)
}
