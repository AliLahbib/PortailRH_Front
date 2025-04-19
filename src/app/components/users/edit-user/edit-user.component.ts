import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{

  userId: number;
  utilisateurForm: FormGroup;  // Formulaire réactif
  isEditMode: boolean = false; // Variable pour vérifier si on est en mode édition
constructor(
  private fb: FormBuilder, // Injection de FormBuilder
  private userService: UserService,
  private route: ActivatedRoute,
  private router: Router
) { }
  ngOnInit(): void {

    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.userId) {
      console.log("get user id ",this.userId)
      this.isEditMode = true;
      this.userService.getUserById(this.userId).subscribe((userData: Utilisateur) => {
        console.log("get user ",userData)
        this.utilisateurForm.patchValue(userData);
      });
    }

    this.utilisateurForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [''],
      matricule: [''],
      motDePasse: [''],
      role: ['']
    });
 }


 saveUser(): void {
  if (this.utilisateurForm.valid) {
    if (this.isEditMode) {
      
      console.log("debug for update",this.userId,this.utilisateurForm.value);
      // Si c'est un update, on appelle la méthode pour mettre à jour l'utilisateur
      this.userService.updateUser(this.userId, this.utilisateurForm.value).subscribe(
        () => {
          // Rediriger vers la liste des utilisateurs après la mise à jour
          alert("Utilisateur mis à jour avec success");
          this.router.navigate(['/users']);
        },
        (error) => {
          alert(error.error);
          console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        }
      );
    } else {
      console.log("debug for create",this.utilisateurForm.value);
      // Si c'est une création, on appelle la méthode pour créer un utilisateur
      this.userService.createUser(this.utilisateurForm.value).subscribe(
        (createdUser) => {
          alert(`Utilisateur ${createdUser.nom} ${createdUser.prenom} créer avec success`);
          this.router.navigate(['/users']);
        },
        (error) => {
          alert(error);
          console.error('Erreur lors de la création de l\'utilisateur:', error);
        }
      );
    }
  }
}

}
