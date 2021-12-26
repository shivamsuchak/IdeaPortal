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
				const alldata = await userservice.getParticipantsbyIdea()
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
				label: 'No of participants',
				data: ylabels,
				fill: false,
				backgroundColor: [
					'rgba(27,180,109,0.6)',
					'rgba(98,161,47,0.6)',
					'rgba(34,181,149,0.6)',
					'rgba(97,69,184,0.6)',
					'rgba(29,131,184,0.6)',
					'rgba(118,111,198,0.6)',
				],
				borderColor: [
					'rgba(27,180,109,1)',
					'rgba(98,161,47,1)',
					'rgba(34,181,149,1)',
					'rgba(97,69,184,1)',
					'rgba(29,131,184,1)',
					'rgba(118,111,198,1)',
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
					No. of Participants by Idea
				</TypoComponent>
			</div>
			<div>
				<Bar data={data} options={options} />
			</div>
		</>
	)
}
