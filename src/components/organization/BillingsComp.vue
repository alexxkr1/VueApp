<template>
    <div class="surface-card p-4 shadow-2 border-round">
      <div class="text-3xl font-medium text-900 mb-3">Billing settings</div>
      <div class="font-medium text-500 mb-3">Details</div>
          <form class="p-fluid" >
          <div class="field">
            <div>
              <label for="event-name">IBAN Number</label>
              <InputText  id="event-name" />
            </div>
            <div>
              <label for="event-name">VAT Number</label>
              <InputText  id="event-name" />
            </div>
          </div>
        
        
  
          <a>Organization url</a>
          <Button type="submit" label="Submit" class="mt-2" />
        </form>
     
  </div>
  </template>