import userservice from '../services/userservice'
import React from 'react'
import ls from 'local-storage'
import TypoComponent from './TypoComponent'
import { Line } from 'react-chartjs-2'

export default function ThemesByDate() {
	const [newdata, setNewData] = React.useState({})
	React.useEffect(() => {
		const token = ls.get('token')
		async function fetchData() {
			if (token) {
				userservice.setToken(token)
				const alldata = await userservice.getThemesbyDate()
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
				label: 'No of themes',
				data: ylabels,
				fill: false,
				lineTension: 0.1,
				backgroundColor: 'rgba(75,192,192,0.4)',
				borderColor: 'rgba(75,192,192,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(75,192,192,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(75,192,192,1)',
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
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
					Themes posted date wise
				</TypoComponent>
			</div>
			<div>
				<Line data={data} options={options} />
			</div>
		</>
	)
}
