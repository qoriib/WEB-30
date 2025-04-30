const ChartCenterTextPlugin = {
    id: 'centerText',
    beforeDraw(chart) {
        const { width } = chart;
        const { ctx } = chart;
        const txt = chart.config.options.centerText.text;

        ctx.restore();
        const fontSize = (width / 6).toFixed(2);
        ctx.font = `600 ${fontSize}px sans-serif`;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        const centerX = chart.getDatasetMeta(0).data[0].x;
        const centerY = chart.getDatasetMeta(0).data[0].y;

        ctx.fillStyle = '#333';
        ctx.fillText(txt, centerX, centerY);
        ctx.save();
    }
};

const ChartHorizontalLegend = {
    id: 'custom-legend',
    afterUpdate(chart) {
      const container = document.getElementById('legend-container');
      container.innerHTML = '';
      chart.data.labels.forEach((label, i) => {
        const value = chart.data.datasets[0].data[i];
        const color = chart.data.datasets[0].backgroundColor[i];
        const item = document.createElement('div');
        item.classList.add('legend-item');
        item.innerHTML = `
          <div class="legend-color" style="background-color:${color}"></div>
          <span class="legend-label">${label}</span>
          <span class="legend-value">${value}%</span>
        `;
        container.appendChild(item);
      });
    }
  }


new Chart(document.getElementById('top3Chart'), {
    type: 'bar',
    data: {
    labels: [
        'Quality Education',
        'No Poverty',
        ['Industry,', 'Innovation and,', 'Infrastructure']
    ],
    datasets: [{
        data: [85, 70, 45],
        backgroundColor: [
            '#001A72',
            '#001A72B2',
            '#001A7266'
        ],
        barThickness: 40
    }]
    },
    options: {
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: context => `${context.parsed.y}%`
                }
            },
            datalabels: {
                anchor: 'end',
                align: 'end',
                formatter: value => `${value}%`,
                font: {
                    weight: '600',
                    size: 12
                },
                color: '#333'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 20
                },
                grid: {
                    display: true,
                    drawBorder: false,
                    color: '#F3F2F7' 
                }
            },
            x: {
                ticks: {
                    font: {
                        size: 12
                    },
                },
                grid: {
                    display: false
                }
            }
        }
    },
    plugins: [ChartDataLabels]
});

new Chart(document.getElementById('chartKomersial'), {
    type: 'doughnut',
    data: {
        labels: ['Komersial', ''],
        datasets: [{
            data: [81, 19],
            backgroundColor: ['#F55B5B', '#FFE6E6'],
            borderWidth: 0,
            cutout: '60%',
        }]
    },
    options: {
        centerText: {
            text: '81%'
        },
        plugins: {
            legend: { display: false },
            datalabels: {
                formatter: (value, context) => {
                    if (context.dataIndex === 0) return value + '%';
                    return '';
                },
                color: '#333',
                font: {
                    weight: '600',
                    size: 8
                },
                anchor: 'center',
                align: 'center'
            }
        }
    },
    plugins: [ChartCenterTextPlugin]
});

new Chart(document.getElementById('chartNonKomersial'), {
    type: 'doughnut',
    data: {
        labels: ['Non Komersial', ''],
        datasets: [{
            data: [22, 78],
            backgroundColor: ['#13AD7E', '#DDF4EC'],
            borderWidth: 0,
            cutout: '60%',
        }]
    },
    options: {
        centerText: {
            text: '22%'
        },
        plugins: {
            legend: { display: false },
            datalabels: {
                formatter: (value, context) => {
                    if (context.dataIndex === 0) return value + '%';
                    return '';
                },
                color: '#333',
                font: {
                    weight: '600',
                    size: 8
                },
                anchor: 'center',
                align: 'center'
            }
        },
    },
    plugins: [ChartCenterTextPlugin]
});

new Chart(document.getElementById('chartBidang'), {
    type: 'doughnut',
    data: {
    labels: ['Pemerintah', 'Akademisi', 'Bisnis', 'Komunitas', 'Media', 'Perorangan'],
        datasets: [{
            data: [52.1, 22.8, 13.9, 11.2, 0, 0],
            backgroundColor: [
                '#333333', // Pemerintah
                '#92BFFF', // Akademisi
                '#94E9B8', // Bisnis
                '#AEC7ED', // Komunitas
                '#E3AEED', // Media
                '#F7C604'  // Perorangan
            ],
            borderWidth: 0
        }]
    },
    options: {
        cutout: '60%',
        plugins: {
            legend: { display: false }
        }
    },
    plugins: [ChartHorizontalLegend]
});

new Chart(document.getElementById('chartTotal'), {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Des'],
        datasets: [
            {
                label: 'Acara',
                data: [100, 300, 200, 900, 2100, 2500, 1900, 1300, 700, 900, 1100, 1000],
                borderColor: '#2D9CDB',
                backgroundColor: '#2D9CDB',
                tension: 0.4,
                fill: false,
                pointRadius: 0
            },
            {
                label: 'Pengunjung',
                data: [900, 1200, 400, 1500, 2300, 1400, 2200, 1700, 600, 2000, 1700, 2500],
                borderColor: '#FF5B5B',
                backgroundColor: '#FF5B5B',
                tension: 0.4,
                fill: false,
                pointRadius: 0
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                align: 'end',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
            annotation: {
                annotations: {
                    febLine: {
                        type: 'line',
                        xMin: 'Feb',
                        xMax: 'Feb',
                        borderColor: '#2D9CDB',
                        borderWidth: 1,
                        borderDash: [4, 4],
                        label: {
                            enabled: true,
                            content: '301',
                            position: 'bottom',
                            backgroundColor: 'transparent',
                            color: '#FF5B5B',
                            font: {
                                weight: '600'
                            }
                        }
                    },
                    mayLine: {
                        type: 'line',
                        xMin: 'May',
                        xMax: 'May',
                        borderColor: '#2D9CDB',
                        borderWidth: 1,
                        borderDash: [4, 4],
                        label: {
                            enabled: true,
                            content: '3.3574',
                            position: 'top',
                            backgroundColor: 'transparent',
                            color: '#2D9CDB',
                            font: {
                                weight: '600'
                            }
                        }
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 500
                },
                grid: {
                    display: false
                }
            },
            x: {
                grid: {
                    drawBorder: false,
                    color: '#F3F2F7'
                }
            }
        }
    }
});

const sektorLabel = [
    'Arsitektur', 'Film', 'Fotografi', 'Kriya', 'Kuliner', 'Seni Rupa', 'Produk',
    'Aplikasi', 'Game', 'TV & Radio', 'Fashion', 'Pertunjukan',
    'Desain Interior', 'Periklanan', 'Penerbitan', 'DKV', 'Musik'
]
const sektorDataValues = [140, 200, 120, 100, 160, 30, 130, 110, 20, 40, 80, 200, 160, 140, 110, 190, 90];
const sektorBackgroundColors = sektorDataValues.map((_, i) => i % 2 === 0 ? '#F44336' : '#FFCA28');

new Chart(document.getElementById('chartSektor'), {
    type: 'bar',
    data: {
        labels: sektorLabel,
        datasets: [{
            label: 'Jumlah',
            data: sektorDataValues,
            backgroundColor: sektorBackgroundColors,
            barThickness: 30
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    drawBorder: false,
                    color: '#F3F2F7'
                }
            },
                x: {
                ticks: {
                    font: { size: 11 }
                },
                grid: {
                    display: false
                }
            }
        }
    }
});

function updateClock() {
    const clockElement = document.querySelector('.header-clock');
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

updateClock();
setInterval(updateClock, 1000);