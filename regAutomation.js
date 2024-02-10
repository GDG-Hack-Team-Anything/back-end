async function handleCSV(event) {
    event.preventDefault();
  
    try {
      const file = event.target.elements.csvFile.files[0]; 
  
      if (!file) {
        throw new Error('Please select a CSV file to upload');
      }
  
      const reader = new FileReader();
      reader.onload = (e) => processCSVData(e.target.result);
      reader.readAsText(file);
    } catch (error) {
      console.error(error);
      showErrorMessage('Error: ' + error.message);
    }
  }
  
  function processCSVData(csvData) {
    const parsedData = papaparse;
  
    if (!parsedData[0].includes('team_name') || !parsedData[0].includes('team_members')) {
      throw new Error('Invalid CSV format: Missing required columns');
    }
  
    for (const row of parsedData.slice(1)) { 
      const teamName = row[0];
      const teamMembers = row[1].split(',').map(member => member.trim().split(/\s+/)); // Split and trim member names and emails
  
      createOrUpdateTeam(teamName);
  
      for (const member of teamMembers) {
        const name = member[0];
        const email = member[1] || ''; 
        registerParticipant(teamName, name, email);
      }
    }
  
    console.log('CSV processing complete.');
    showSuccessMessage('Registration successful!');
  }
  
  function createOrUpdateTeam(teamName) {
    const existingTeam = getTeamByName(teamName);
    if (existingTeam) {
      updateTeam(existingTeam.id, { name: teamName }); 
    } else {
      createTeam({ name: teamName }); 
    }
  }
  
  function registerParticipant(teamName, name, email) {
    const team = getTeamByName(teamName);
    if (team) {
      registerParticipantForTeam(team.id, { name, email }); 
    } else {
      console.error(`Team "${teamName}" not found. Participant not registered.`);
    }
  }
  
  function showSuccessMessage(message) {
    alert(message);
  }
  
  function showErrorMessage(message) {
    console.error(message);
  }
  