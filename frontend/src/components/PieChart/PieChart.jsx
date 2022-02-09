import React from 'react';
import PieChart, {
	Series,
	Label,
	Connector,
	Size,
} from 'devextreme-react/pie-chart';
import './pieChart.css'

const areas = [
	{
		country: 'Russia',
		area: 12,
	},
	{
		country: 'Canada',
		area: 7,
	},
	{
		country: 'USA',
		area: 7,
	},
	{
		country: 'China',
		area: 7,
	},
	{
		country: 'Brazil',
		area: 6,
	},
	{
		country: 'Australia',
		area: 5,
	},
	{
		country: 'India',
		area: 2,
	},
	{
		country: 'Others',
		area: 55,
	},
];

function PieChartComp({title}) {
	return (
		<div className='pieChartContainer'>
			<h2>{title}</h2>
		<PieChart
		legend={{horizontalAlignment:'center',	 width:'80vw',verticalAlignment:"bottom"}}
			id="pie"
			dataSource={areas}
			palette="Bright"
			className='pieChart'
			>
			<Series argumentField="country" valueField="area">
 				<Label visible={true}>
					<Connector visible={true} width={0.5} />
				</Label> 
			</Series>
			<Size width='100%' />
		</PieChart>
			</div>
	);
}

export default PieChartComp;
