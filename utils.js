// Save data to REDCap
function saveDataREDCap() {

    const auto_number = window.record_id == undefined

    console.log(auto_number)

    var jspsych_data = jsPsych.data.get().json();

    var redcap_record = JSON.stringify([{
        record_id: auto_number ? 1 : window.record_id, // Mandatory, but if auto_number then ignored by REDcap
        prolific_pid: window.prolificPID,
        study_id: window.studyId,
        session_id: window.sessionId,
        start_time: window.startTime,
        exp_code_version: code_version,
        group: window.condition,
        jspsych_data: jspsych_data,
        auto_number: auto_number ? 'true' : 'false'
    }])

    fetch('https://h6pgstm0f9.execute-api.eu-north-1.amazonaws.com/prod/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: redcap_record
    })
    .then(data => {
        if (data.status === 200) {
            console.log('Data successfully submitted to REDCap');
        } else {
            console.error('Error submitting data:', data.message);
        }
        return data.json()
    })
    .then(data => {
        console.log(data)
        if (auto_number){
            window.record_id = JSON.parse('[' + data[0] + ']')[0]
        }
    }
    )
    .catch(error => {
        console.error('Error:', error);
    });
}

// Function for formatting data from API
function format_date_from_string(s){
    const dateTime = new Date(s);

    // Get individual components
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');

    // Format the date and time
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return formattedDate + "_" + formattedTime
}

// Functions for computing remaining feedback after early stop
function countPLTAfterLastNonPLT(arr) {
    let count = 0;
    let foundNonPLT = false;
    
    // Iterate from the end to the beginning of the array
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] !== "PLT") {
        // If a non-PLT string is found, stop the iteration
        foundNonPLT = true;
        break;
      } else {
        // If foundNonPLT is true and we encounter "PLT", increase the count
        count++;
      }
    }
  
    return count;
}

function getSumofMax(arr1, arr2) {
    function add(accumulator, a) {
        return accumulator + a;
      }
      
// Assuming arr1 and arr2 are of the same length
    return arr1.map((value, index) => Math.max(value, arr2[index])).reduce(add, 0);
}
  
  