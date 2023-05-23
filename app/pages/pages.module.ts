import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignComponent } from './sign/sign.component';
import { HomeComponent } from './documents/home/home.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatCardModule} from '@angular/material/card'; 
import { ReactiveFormsModule } from '@angular/forms';
import {  MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { AppRoutingModule } from '../app-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import { AddDocumentComponent } from './documents/add-document/add-document.component';
import { ListDocumentsComponent } from './documents/list-documents/list-documents.component';
import { AllDocumentsComponent } from './documents/all-documents/all-documents.component'; 
import {MatRadioModule} from '@angular/material/radio'; 
import {MatDividerModule} from '@angular/material/divider'; 
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule , HttpInterceptor} from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop'; 
import { NgxDropzoneModule } from 'ngx-dropzone';
import {MatSelectModule} from '@angular/material/select'; 
import { MatListModule } from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RequestsComponent } from './documents/requests/requests.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmDeleteComponent } from './dialog/confirm-delete/confirm-delete.component';
import { AskForRequestComponent } from './ask-for-request/ask-for-request.component';
import { PublicDocumentsComponent } from './documents/public-documents/public-documents.component'; 
import { HttpClient , HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptorInterceptor } from '../interceptor/auth-interceptor.interceptor';
import { DialogSignComponent } from './dialog-sign/dialog-sign.component';
import { OrganisationComponent } from './organisations/organisation/organisation.component';
import { AddOrganisationComponent } from './organisations/add-organisation/add-organisation.component';
import { CreateOrganisationComponent } from './organisations/create-organisation/create-organisation.component';
import { InvitationsComponent } from './organisations/invitations/invitations.component';
import { JoinRequestsComponent } from './join-requests/join-requests.component';
import { HomeHeroComponent } from './home-hero/home-hero.component';
import { AdminInterfaceComponent } from './organisations/admin-interface/admin-interface.component';
import { UserRequestsComponent } from './organisations/user-requests/user-requests.component';
import { MembresComponent } from './organisations/membres/membres.component';
import { SendInvitationComponent } from './organisations/send-invitation/send-invitation.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { UserLogsComponent } from './logs/user-logs/user-logs.component';
import { DocumentLogsComponent } from './logs/document-logs/document-logs.component';
import { SignRequestsComponent } from './organisations/sign-requests/sign-requests.component';
import {MatSortModule} from '@angular/material/sort';
import {MatChipsModule} from '@angular/material/chips'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CertificateComponent } from './dialog/certificate/certificate.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ClipboardModule } from '@angular/cdk/clipboard';
 @NgModule({
  declarations: [
    
    LoginComponent,
    SignComponent,
    HomeComponent,
    AddDocumentComponent,
    ListDocumentsComponent,
    AllDocumentsComponent,
    RequestsComponent,
    ConfirmDeleteComponent,
    AskForRequestComponent,
    PublicDocumentsComponent,
    DialogSignComponent,
    OrganisationComponent,
    AddOrganisationComponent,
    CreateOrganisationComponent,
    InvitationsComponent,
    JoinRequestsComponent,
    HomeHeroComponent,
    AdminInterfaceComponent,
    UserRequestsComponent,
    MembresComponent,
    SendInvitationComponent,
    ProfileComponent,
    UserLogsComponent,
    DocumentLogsComponent,
    SignRequestsComponent,
    CertificateComponent,
    
    
  ],
  imports: [
    
    CommonModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    RouterModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    AppRoutingModule,
    MatTabsModule,
    MatRadioModule,
    MatDividerModule,
    MatProgressBarModule,
    HttpClientModule,
    DragDropModule,
    NgxDropzoneModule,
    MatSelectModule,
    MatListModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    ClipboardModule
      ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true }

  ]
})
export class PagesModule { }
