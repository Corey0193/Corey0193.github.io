    <script>
        function calculateDelayKnob(cableLengths) {
            const cableLengthsMeters = cableLengths.map(length => length / 3.28084);
            const maxCableLength = Math.max(...cableLengthsMeters);
            return cableLengthsMeters.map(length => {
                if (length > 0) {
                    return Math.round(((maxCableLength * 4.17) - (length * 4.17)) / 33);
                } else {
                    return "";
                }
            });
        }

        const cableLengths = Array(8).fill(0);
        const delayKnobs = calculateDelayKnob(cableLengths);
        const tableBody = document.getElementById("tableBody");

        for (let i = 0; i < 8; i++) {
            const row = document.createElement("tr");
            const transmitterNumberCell = document.createElement("td");
            const cableLengthCell = document.createElement("td");
            const delayKnobCell = document.createElement("td");

            transmitterNumberCell.textContent = i + 1;
            cableLengthCell.innerHTML = `<input type="number" min="0" value="${cableLengths[i]}" onchange="updateCableLength(event, ${i})">`;
            delayKnobCell.textContent = delayKnobs[i];

            row.appendChild(transmitterNumberCell);
            row.appendChild(cableLengthCell);
            row.appendChild(delayKnobCell);
            tableBody.appendChild(row);
        }


        function updateCableLength(event, index) {
            cableLengths[index] = parseFloat(event.target.value) || 0;
            const newDelayKnobs = calculateDelayKnob(cableLengths);

            for (let i = 0; i < 15; i++) {
                tableBody.children[i].children[2].textContent = newDelayKnobs[i];
            }
        }
    </script>
