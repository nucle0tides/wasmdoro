#![feature(use_extern_macros)]

extern crate wasm_bindgen;
extern crate chrono;

use wasm_bindgen::prelude::*;
use chrono::Duration;
use std::fmt;

#[wasm_bindgen]
pub struct WasmdoroTimer {
    pomodoro_count: i32,
    default_pomodoro_time: Duration,
    pomodoro_time: Duration,
    total_time: Duration,
    inprogress_pomodoro: bool,
}

#[wasm_bindgen]
impl WasmdoroTimer {
    pub fn new() -> WasmdoroTimer {
        WasmdoroTimer {
            pomodoro_count: 0,
            default_pomodoro_time: Duration::minutes(25),
            pomodoro_time: Duration::minutes(25), 
            total_time: Duration::minutes(0),
            inprogress_pomodoro: false,
        }
    }

    // just make everything public it's fine
    pub fn start_pomodoro(&mut self) {
        self.inprogress_pomodoro = true;
    }

    pub fn reset_pomodoro(&mut self) {
        self.inprogress_pomodoro = false;
        self.pomodoro_time = self.default_pomodoro_time;
    }

    pub fn successful_pomodoro(&mut self) {
        self.pomodoro_count += 1;
        self.total_time = self.total_time + self.default_pomodoro_time;
        self.reset_pomodoro()
    }

    pub fn pomodoro_count(&self) -> i32 {
        self.pomodoro_count
    }

    pub fn total_time(&self) -> String {
        let num_mins = self.total_time.num_minutes();
        let num_seconds = self.total_time.num_seconds() - (60 * num_mins);
        format!("{:02}:{:02}", num_mins, num_seconds)
    }

    pub fn inprogress_pomodoro(&self) -> bool {
        self.inprogress_pomodoro
    }

    pub fn times_up(&self) -> bool {
        self.pomodoro_time.is_zero()
    }

    pub fn decrement_time(&mut self) {
        self.pomodoro_time = self.pomodoro_time - Duration::seconds(1);
    }

    pub fn render(&self) -> String {
        self.to_string()
    }
}

impl fmt::Display for WasmdoroTimer {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let num_mins = self.pomodoro_time.num_minutes();
        let num_seconds = self.pomodoro_time.num_seconds() - (60 * num_mins);
        write!(f, "{:02}:{:02}", num_mins, num_seconds)?;

        Ok(())
    }
}
