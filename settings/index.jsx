import * as api from "../common/api.js";

console.log("Opening Settings page");

var coinOptions = [];
var baseOptions = [];

function updateCoinOptions() {
  return api.getCoinList()
  .then(function(coins) {
    coins = coins.sort(function compare(c1, c2) {
      return c1["SortOrder"] - c2["SortOrder"];
    });
    coinOptions = coins.map(function(coinInfo){
      return {name: coinInfo.Name + " - " + coinInfo.Symbol, value: coinInfo.Id};
    });
  });
}

function updateBaseOptions(id) {
  return api.getCoinSubscriptions(id)
  .then(function(subs) {
    baseOptions = subs.map(function(sub) {
      return {name: sub.tsym +"  -  "+ sub.exchange, value: sub};
    });
  });
}



function mySettings(props) { 
  return (
    <Page>
      <Section
        title={<Text bold align="center">CryptoScope</Text>}>
        <AdditiveList
          title="Coin pairs"
          settingsKey="subscriptions"
          maxItems="10"
          addAction={
            <Section title="Add a new pair">
              <Select label="Coin"
                  options={coinOptions}
                  onSelection={
                    (selection) => {
                      updateBaseOptions(selection.values[0])
                      .then(function() {
                          registerSettingsPage(mySettings);
                      })
                      .catch(function(err) {
                          console.log("Unable to access getCoinSubscriptions API \n"+err);
                      });
                    }
                  }
              />
              <Select 
                label="Base Currency/Exchange"
                options={baseOptions}
              />
            </Section>
          }
        />
      </Section>
    </Page>
  );
}


updateCoinOptions()
.then(function() {
  registerSettingsPage(mySettings);
})
.catch(function(err) {
  console.log("Unable to access getCoinList API \n"+err);
});
