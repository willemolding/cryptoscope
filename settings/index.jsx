import { SUBSCRIPTIONS } from "../companion/subscriptions.js"
console.log("Opening Settings page");


function mySettings(props) { 
  return (
    <Page>
      <Section title={<Text bold align="center">Settings</Text>}>
        <Select
          label="Preferred Currency"
          settingsKey="currency"
          options={[
            {name: "BTC"},
            {name: "USD"},
            {name: "CAD"},
            {name: "AUD"},
            {name: "EUR"},
            {name: "GBP"},
            {name: "CNY"},
            {name: "JPY"},
            {name: "NZD"},
          ]}
        />
      </Section>
      <Section title={<Text bold align="center">Add Coin Pairs</Text>}>     
        <AdditiveList
          title="Coin Pairs"
          settingsKey="subscriptions"
          maxItems="10"
          addAction={
            <TextInput
              title="Add new pair"
              label="Add new pair"
              placeholder="e.g. Litecoin / BTC - BitTrex"
              action="Add Pair"
              onAutocomplete={(value) => {
                return SUBSCRIPTIONS.filter((option) =>
                  option.name.toLowerCase().startsWith(value.toLowerCase()));
              }}
            /> 
          }
        />
      </Section>
    </Page>
  );
}


registerSettingsPage(mySettings);