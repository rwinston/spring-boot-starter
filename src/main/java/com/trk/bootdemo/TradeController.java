package com.trk.bootdemo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/trades")
public class TradeController {

	@GetMapping("/{id}")
	public ResponseEntity<Trade> read(@PathVariable String id) {
		if (id.equals("0")) return ResponseEntity.notFound().build();
		Trade trade = new Trade();
		trade.setId(id);
		return ResponseEntity.ok(trade);
	}
	
}
