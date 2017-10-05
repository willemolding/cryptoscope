
console.log("Opening Settings page");

function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Bart Schedule</Text>}>
        <AdditiveList
          title="Select your favorite stations"
          settingsKey="favorite_station_setting"
          maxItems="5"
          addAction={
            <TextInput
              title="Add a Bart Station"
              label="Name"
              placeholder="Type something"
              action="Add Station"
            />
          }
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);