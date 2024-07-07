import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



// for (var i = 0; i < 10; i++) {
//     console.log(random_rgba())
// }    

const AnalyticsComponent = (props) => {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Contributed',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1,
            },
        ],
    });

    const colorsArray = ['#EE4E4E', '#FFC700', '#FFF455', '#219C90', '#81A263', '#77E4C8', '#405D72', '#F4CE14', '#FF7F3E'];


    function random_rgba(opacity) {
        let o = Math.round, r = Math.random, s = 255;

        let last = 1; //opacity ? opacity : r().toFixed(1.0);

        return 'rgba('
            + o(r() * s)
            + ','
            + o(r() * s)
            + ','
            + o(r() * s)
            + ','
            + last
            + ')'
    }

    useEffect(() => {
        data.labels = [];
        data.datasets[0].backgroundColor = [];
        data.datasets[0].borderColor = [];
        data.datasets[0].data = [];
        props.expenseSummary && props.expenseSummary.memShares &&
            props.expenseSummary.memShares.length > 0 && props.expenseSummary.memShares.map((share, i) => {
                data.labels.push(share.member.label);
                let bgColor = colorsArray[i] ? colorsArray[i] : random_rgba(1);
                let borderColor = colorsArray[i] ? colorsArray[i] : random_rgba(1);
                let expense = share.totalExpenseByMember ? share.totalExpenseByMember : 0;

                data.datasets[0].backgroundColor = [...data.datasets[0].backgroundColor, bgColor];
                data.datasets[0].borderColor = [...data.datasets[0].borderColor, borderColor];
                data.datasets[0].data = [...data.datasets[0].data, expense]
            })
        setData(data);
        console.log("data", data, props)


    }, [])


    return (
        <>
            <h4 className='mt-5'>Summary</h4>
            {data?.datasets[0]?.data?.length > 0 && <Doughnut data={data} />}
            {/* {data?.datasets[0]?.data?.length > 0 && <Pie data={data} />} */}
        </>
    )
}

export default AnalyticsComponent
