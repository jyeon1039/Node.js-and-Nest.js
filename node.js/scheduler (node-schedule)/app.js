const schedule = require('node-schedule');

//const rule = '0 0 9 * * 1'; // 매주 월요일 오전 9시 정각 (0 or 7 is Sun)
const rule = new schedule.RecurrenceRule();
rule.minute = 40;

const job = schedule.scheduleJob(rule, function() {
    console.log("40분이 될 때마다 실행");
});

const rule2 = new schedule.RecurrenceRule();
rule2.minute = 0;
rule2.second = 0;

const job2 = schedule.scheduleJob(rule2, function() {
    console.log("정각이 될 때마다 실행");
})

const rule3 = new schedule.RecurrenceRule();
rule3.hour = 12;
rule3.minute = 0;
rule3.second = 0;

const job3 = schedule.scheduleJob(rule3, function() {
    console.log("매일 12시에 실행");
})