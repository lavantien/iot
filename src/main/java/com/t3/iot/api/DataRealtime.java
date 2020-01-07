package com.t3.iot.api;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class DataRealtime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Double humidity;
	private Double temperature;
	private Double heatIndex;
	private String date;
	private String time;

	public DataRealtime() {
	}

	public DataRealtime(Double humidity, Double temperature, Double heatIndex, String date, String time) {
		this.humidity = humidity;
		this.temperature = temperature;
		this.heatIndex = heatIndex;
		this.date = date;
		this.time = time;
	}

	@Override
	public String toString() {
		return "DataRealtime{" +
			"id=" + id +
			", humidity=" + humidity +
			", temperature=" + temperature +
			", heatIndex=" + heatIndex +
			", date='" + date + '\'' +
			", time='" + time + '\'' +
			'}';
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		DataRealtime that = (DataRealtime) o;
		return Objects.equals(id, that.id) &&
			Objects.equals(humidity, that.humidity) &&
			Objects.equals(temperature, that.temperature) &&
			Objects.equals(heatIndex, that.heatIndex) &&
			Objects.equals(date, that.date) &&
			Objects.equals(time, that.time);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, humidity, temperature, heatIndex, date, time);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Double getHumidity() {
		return humidity;
	}

	public void setHumidity(Double humidity) {
		this.humidity = humidity;
	}

	public Double getTemperature() {
		return temperature;
	}

	public void setTemperature(Double temperature) {
		this.temperature = temperature;
	}

	public Double getHeatIndex() {
		return heatIndex;
	}

	public void setHeatIndex(Double heatIndex) {
		this.heatIndex = heatIndex;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}
}
