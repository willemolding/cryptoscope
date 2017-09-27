import * as api from "../common/api.js";

console.log("Opening Settings page");


class AddNewPair extends React.Component {

  constructor(props) {
    super(props);
    this.state = {coinOptions: [], baseOptions: [], value=null};
    updateCoinOptions();
  }

  updateCoinOptions() {
    this.setState({coinOptions: []});

    api.getCoinList()
    .then(function(coins) {
      coins = coins.sort(function compare(c1, c2) {
        return c1["SortOrder"] - c2["SortOrder"];
      });
      coinOptions = coins.map(function(coinInfo){
        return {name: coinInfo.Name + " - " + coinInfo.Symbol, value: coinInfo.Id};
      });
      this.setState({coinOptions: coinOptions});
    })
    .catch(function(err) {
      console.log("Unable to access getCoinList API \n"+err);
    });
  }

  updateBaseOptions(id) {
    this.setState({baseOptions: []});

    api.getCoinSubscriptions(id)
    .then(function(subs) {
      baseOptions = subs.map(function(sub) {
        return {name: sub.tsym +"  -  "+ sub.exchange, value: sub};
      });
      this.setState({baseOptions: baseOptions});
    })
    .catch(function(err) {
      console.log("Unable to call getCoinSubscriptions API\n"+err);
    });
  }

  render() {
    return (
      <Section title="Add a new pair">
        <Select 
          label="Coin"
          options={this.state.coinOptions}
          onSelection={function(e) {
            updateBaseOptions(e.values[0]);
          }
        }
        />
        <Select 
          label="Base Currency/Exchange"
          options={this.state.baseOptions}
          onSelection={function(e) {
            this.setState(value: e.values[0]);
          }
        }
        />
      </Section>
    );
  }
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
            <AddNewPair/>
          }
        />
      </Section>
    </Page>
  );
}


registerSettingsPage(mySettings);

