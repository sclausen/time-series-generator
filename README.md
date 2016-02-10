## time-series-generator
generates reproducible pseudo random time series

### Dependencies
This project depends on a globally installed [typescript](https://www.npmjs.com/package/typescript) and [typings](https://www.npmjs.com/package/typings)

### Installation

```sh
npm install;
typings install;
tsc;
```

### Config File

you can provide a configuration as follows

``` json
{
  "start-date": "2016-02-01",
  "end-date": "2016-02-02",
  "resolution": "24 hours",
  "limits": [-10, 35],
  "template": {
    "v": "{value}",
    "t": "{timestamp}",
    "additionalField": "foo"
  }
}
```
you have to provide a start- and an end-date. also you have to provide a resolution in which each value should appear. the resolution must be a divider of one day an can be an integer and one of the following time units: second(s), minute(s), hour(s).
furthermore, you have to specify bounds of the time serie to generate.
you can add more fields to the template as desired, but the values `{value}` and `{timestamp}` have to be somewhere as a value in the template. value and timestamp in curly braces are replaced on time-series generation.
