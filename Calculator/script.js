document.addEventListener('DOMContentLoaded', function() {
            var display = document.getElementById('display');
            var buttons = document.getElementsByClassName('button');
            var currentExpression = '';
            var shouldResetScreen = false;

            for (var i = 0; i < buttons.length; i++) {
                buttons[i].addEventListener('click', function(e) {
                    var id = e.target.id;

                    if (id === 'ac') {
                        currentExpression = '';
                        display.innerText = '0';
                    } else if (id === 'ce') {
                        currentExpression = '';
                        display.innerText = '0';
                    } else if (id === 'plus-minus') {
                        if (currentExpression) {
                            var lastNumberMatch = currentExpression.match(/-?\d+(\.\d+)?$/);
                            if (lastNumberMatch) {
                                var lastNumber = lastNumberMatch[0];
                                if (lastNumber.startsWith('-')) {
                                    currentExpression = currentExpression.slice(0, -lastNumber.length) + lastNumber.substring(1);
                                } else {
                                    currentExpression = currentExpression.slice(0, -lastNumber.length) + '-' + lastNumber;
                                }
                                display.innerText = currentExpression;
                            }
                        }
                    } else if (id === 'decimal') {
                        var lastNumberMatch = currentExpression.match(/\d+(\.\d+)?$/);
                        if (!lastNumberMatch || !lastNumberMatch[0].includes('.')) {
                            currentExpression += '.';
                            display.innerText = currentExpression;
                        }
                    } else if (id === 'equals') {
                        if (currentExpression) {
                            try {
                                currentExpression = evaluateExpression(currentExpression);
                                display.innerText = currentExpression;
                            } catch (error) {
                                display.innerText = 'Error';
                            }
                            shouldResetScreen = true;
                        }
                    } else if (e.target.classList.contains('operator')) {
                        if (currentExpression && !isOperator(currentExpression.slice(-1))) {
                            currentExpression += e.target.innerText;
                            display.innerText = currentExpression;
                        }
                    } else {
                        if (shouldResetScreen) {
                            currentExpression = '';
                            shouldResetScreen = false;
                        }
                        currentExpression += e.target.innerText;
                        display.innerText = currentExpression;
                    }
                });
            }

            function isOperator(character) {
                return ['+', '-', '×', '÷'].indexOf(character) > -1;
            }

            function evaluateExpression(expression) {
                expression = expression.replace(/×/g, '*').replace(/÷/g, '/');
                return new Function('return ' + expression)().toString();
            }
        });