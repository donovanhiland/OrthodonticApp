angular.module('orthoApp')
    .directive('dbMainDir', function(accountService) {

        return {
            restrict: 'AE',
            templateUrl: 'app/components/account/patientDashboard/dbMainDir.html',
            // controller:
            link: function($scope) {

                /*** Chart JS ***/
                accountService.getCurrentUser()
                    .then(function(response) {
                        var treatmentTime = response.data.ett;
                        var daysLeft = treatmentTime;
                        var daysPassed = 0;

                        Chart.defaults.global.title.display = true;
                        Chart.defaults.global.title.text = 'Estimated Treatment Time';
                        Chart.defaults.global.title.fontColor = 'white';
                        Chart.defaults.global.title.fontSize = 16;
                        Chart.defaults.global.title.position = 'bottom';
                        Chart.defaults.global.defaultFontColor = 'white';
                        Chart.defaults.global.defaultFontFamily = 'sans-serif';
                        Chart.defaults.global.defaultFontSize = 14;

                        var ctx = $('#ett-graph');
                        var ettChart = new Chart(ctx, {
                            type: 'doughnut',
                            data: {
                                labels: ["Days Left", "Days Passed"],
                                datasets: [{
                                    label: 'days',
                                    data: [daysLeft, daysPassed],
                                    backgroundColor: ['#98de25', '#A8C9DE'],
                                    borderWidth: '10px',
                                    borderColor: ['#98de25', '#A8C9DE']
                                }]
                            },
                            options: {
                                defaultFontColor: 'white',
                                cutoutPercentage: 60
                            }
                        });

                        setTimeout(function() {
                            var updateChart = setInterval(function() {
                                if (daysPassed >= treatmentTime) {
                                    clearInterval(updateChart);
                                } else {
                                    ettChart.data.datasets[0].data[0] -= 1;
                                    daysLeft -= 1;
                                    ettChart.data.datasets[0].data[1] += 1;
                                    daysPassed += 1;
                                    ettChart.update();
                                }
                            }, 200);
                        }, 1000);
                    });

            }
        };

    });
