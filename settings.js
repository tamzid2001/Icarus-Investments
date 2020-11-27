const acc = document.querySelector('.account')
async function accDetails(){
	const token = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4YWYxZGI3ZDBjYzA1NmFkNzVkNmYwY2IzYmQ5ZTVlNiIsInBlcm1pc3Npb25zIjpbXSwiaWF0IjoxNjA1NTE2OTQ3LCJyZWFsVXNlcklkIjoiOGFmMWRiN2QwY2MwNTZhZDc1ZDZmMGNiM2JkOWU1ZTYifQ.Q2mBRdxm3Rz800XGLazxkZhDdZyONZWX-tcfboN4lkKiRpDioCzAP21vZ8krP6HEMJ4SPO51_TT2699h1c9W6VtkagE8dSn1jAetrZULFeomPhpy3lE8N7t7P0_yIGPvUPR19XJ6mWhrav_chB8kX7W6deAE8T0ieAm8zKCe_A47tixoXGkfZUFABHNHQO6gxj4ctfVAfolMmcHYDMYFZYSrCEtPruqCZ1UeRl1fcyRvI_3oD38sDbwowRsy5bhK-Bul6jO448YcodvFmtOBFJCV8VNAKw-Z6DfLDlgWBevTZfc_KBrmP9H3ZvUGroIVdRXg8GagEeIwdPMJ07Hjpu7cy2kz0F2i926Q-SA2gCKtYQqgzDhdZ3zMFj2howEI5cBhl9YUL_8MSAVf3OkrYcqD3JlUPhYYxoNIrpGREq6v2T6YumN8n5adKjdHTQtAP8IAJchDd8ySkkt3BaTPq_zxQ2QGKey04QNSN6NIlVjT03gj24iyhPSHun3OKCP7-g2P8BTL0_d1AW8aJBP9xPsORKEzSGr1BBKmoUtyZtgu8bqesp85Ql5cGDMvjMCLYgAmw2p-4xCp_nLRT9fZTeX65RjZsa6NdsnQGYew1bkrJYTqhd0FV-Rt21EPSIAx69NQxoM8cHqvB4jSioNKQ3kaA3QiBC9jkaxkSmkPAIY';
  	const api = new MetaApi(token);
	const user = auth.currentUser;
	
	if(localStorage.getItem("accountId") == null) {
		db.collection("users").doc(user.uid).get().then(doc => {
  		if(doc.data().accountId == ''){
  			console.log("NO ACCOUNTS TO REMOVE")
  		} else {
  			try {
          const account = await api.metatraderAccountApi.getAccount(doc.data().accountId);

          log('Waiting for API server to connect to broker (may take couple of minutes)');
          await account.waitConnected();

          // connect to MetaApi API
          let connection = await account.connect();

          // wait until terminal state synchronized to the local state
          log('Waiting for SDK to synchronize to terminal state (may take some time depending on your history size)');
          await connection.waitSynchronized();

          // invoke RPC API (replace ticket numbers with actual ticket numbers which exist in your MT account)
          log('Testing MetaAPI RPC API');
          const ac = await connection.getAccountInformation();
          console.log(ac)
          //log('positions:', JSON.stringify(await connection.getPositions()));
          //log(await connection.getPosition('1234567'));
          //log('open orders:', JSON.stringify(await connection.getOrders()));
          //log(await connection.getOrder('1234567'));
          //log('history orders by ticket:', JSON.stringify(await connection.getHistoryOrdersByTicket('1234567')));
          //log('history orders by position:', JSON.stringify(await connection.getHistoryOrdersByPosition('1234567')));
          //log('history orders (~last 3 months):', JSON.stringify(await connection.getHistoryOrdersByTimeRange(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), new Date())));
          //log('history deals by ticket:', JSON.stringify(await connection.getDealsByTicket('1234567')));
          //log('history deals by position:', JSON.stringify(await connection.getDealsByPosition('1234567')));
          //log('history deals (~last 3 months):', JSON.stringify(await connection.getDealsByTimeRange(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), new Date())));
  			const html = `
        <div>Logged in as ${user.email}</div>
        <div>${ac.broker}</div>
      `;
      		acc.innerHTML = html;
  		} catch (err) {
  		console.log(err);
  	}
  	} 
  }
  	} else {
  		try {

  		} catch (err) {
  			console.log(err)
  		}
  	}
	

      
    
}

const removeAcc = document.querySelector('#remove');
removeAcc.addEventListener('click', (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  console.log(user.email);
  if(user){
  if(localStorage.getItem("accountId") == null){
  	db.collection("users").doc(user.uid).get().then(doc => {
  		if(doc.data().accountId == ''){
  			console.log("NO ACCOUNTS TO REMOVE")
  		} else {
  			remove(doc.data().accountId, user);
  		}
  	}
  } else {
  	const accID = localStorage.getItem("accountId");
  	remove(accID, user);
  }
} else {
	window.location.replace('login.html')
}
});

async function remove(a,user){
	const token = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI4YWYxZGI3ZDBjYzA1NmFkNzVkNmYwY2IzYmQ5ZTVlNiIsInBlcm1pc3Npb25zIjpbXSwiaWF0IjoxNjA1NTE2OTQ3LCJyZWFsVXNlcklkIjoiOGFmMWRiN2QwY2MwNTZhZDc1ZDZmMGNiM2JkOWU1ZTYifQ.Q2mBRdxm3Rz800XGLazxkZhDdZyONZWX-tcfboN4lkKiRpDioCzAP21vZ8krP6HEMJ4SPO51_TT2699h1c9W6VtkagE8dSn1jAetrZULFeomPhpy3lE8N7t7P0_yIGPvUPR19XJ6mWhrav_chB8kX7W6deAE8T0ieAm8zKCe_A47tixoXGkfZUFABHNHQO6gxj4ctfVAfolMmcHYDMYFZYSrCEtPruqCZ1UeRl1fcyRvI_3oD38sDbwowRsy5bhK-Bul6jO448YcodvFmtOBFJCV8VNAKw-Z6DfLDlgWBevTZfc_KBrmP9H3ZvUGroIVdRXg8GagEeIwdPMJ07Hjpu7cy2kz0F2i926Q-SA2gCKtYQqgzDhdZ3zMFj2howEI5cBhl9YUL_8MSAVf3OkrYcqD3JlUPhYYxoNIrpGREq6v2T6YumN8n5adKjdHTQtAP8IAJchDd8ySkkt3BaTPq_zxQ2QGKey04QNSN6NIlVjT03gj24iyhPSHun3OKCP7-g2P8BTL0_d1AW8aJBP9xPsORKEzSGr1BBKmoUtyZtgu8bqesp85Ql5cGDMvjMCLYgAmw2p-4xCp_nLRT9fZTeX65RjZsa6NdsnQGYew1bkrJYTqhd0FV-Rt21EPSIAx69NQxoM8cHqvB4jSioNKQ3kaA3QiBC9jkaxkSmkPAIY';
  	const api = new MetaApi(token);
	try {

	const account = await api.metatraderAccountApi.getAccount(a);
	return account.remove().then(res => {
		console.log(res);
		await db.collection('users').doc(user.uid).setItem({
			accountId: ''
		});
		
	});
	} catch (err) {
		console.log(err)
	}
}

