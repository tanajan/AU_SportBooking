const lineChart = {
    series: [
        {
            name: "Badmintons",
            data: [350, 40, 300, 220, 500, 250, 400, 230, 500,12,70,90],
            offsetY: 0,
        },
        {
            name: "Volleyball",
            data: [30, 90, 40, 140, 290, 290, 340, 230, 400,80,200,250],
            offsetY: 0,
        },
        {
            name: "Tennis",
            data: [3, 9, 4, 14, 29, 29, 34, 23, 40],
            offsetY: 0,
        },
    ],
    options: {
        chart: {
            width: "100%",
            height: 350,
            type: "area",
            toolbar: {
                show: false,
            },
        },

        legend: {
            show: false,
        },

        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
        },

        yaxis: {
            labels: {
                style: {
                    fontSize: "14px",
                    fontWeight: 600,
                    colors: ["#8c8c8c"],
                },
            },
        },

        xaxis: {
            labels: {
                style: {
                    fontSize: "14px",
                    fontWeight: 600,
                    colors: [
                        "#8c8c8c",
                        "#8c8c8c",
                        "#8c8c8c",
                        "#8c8c8c",
                        "#8c8c8c",
                        "#8c8c8c",
                        "#8c8c8c",
                        "#8c8c8c",
                        "#8c8c8c",
                    ],
                },
            },
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ],
        },

        tooltip: {
            y: {
                formatter: function (val) {
                    return val;
                },
            },
        },
    },
};

export default lineChart;