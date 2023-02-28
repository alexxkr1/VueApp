<template>
    <div class="surface-card p-4 shadow-2 border-round">
      <div class="text-3xl font-medium text-900 mb-3">Google Analytics</div>
          <form class="p-fluid" >
          <div class="field">
            <div>
              <label for="event-name">Google analytics ID</label>
              <InputText  id="event-name" />
            </div>
          </div>     
          <Button type="submit" label="Update" class="mt-2" />
        </form>
     
  </div>
<br>
  <div class="surface-card p-4 shadow-2 border-round">
      <div class="text-3xl font-medium text-900 mb-3">Facebook Pixel</div>
          <form class="p-fluid" >
          <div class="field">
            <div>
              <label for="event-name">Facebook Pixel ID</label>
              <InputText  id="event-name" />
            </div>
          </div>     
          <Button type="submit" label="Update" class="mt-2" />
        </form>
     
  </div>
  </template>